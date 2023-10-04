/*BehaviorSubject is a type of subject, 
a subject is a special type of observable so you can subscribe to messages like any 
other observable. 
The unique features of BehaviorSubject are: It needs an initial value as it must always 
return a value on subscription even if it hasn't received a next(). 
Upon subscription, it returns the last value of the subject. 
A regular observable only triggers when it receives an onnext OnError or onCompleted. 
A BehaviorSubject triggers on subscription. 
A BehaviorSubject can be used to act as a proxy/relay between the source and many observers. 
Because the subject is an observer, 
this also means you may provide a subject as the argument to the subscribe of any observable, 
like the example below shows: 
var subject = new Rx.BehaviorSubject(0); 
var source = Rx.Observable.interval(1000); 
source.subscribe(subject); 
subject.subscribe( value => console.log('Subscriber A: ', value), 
error => console.log('Subscriber A: ', error), 
() => console.log('Subscriber A: ', 'Completed') ); 
setTimeout( () => 
  { subject.subscribe( value => console.log('Subscriber B: ', value), 
  error => console.log('Subscriber B: ', error), 
  () => console.log('Subscriber B: ', 'Completed') ); }, 3000 ); 
  // Subscriber A: 0 
  // Subscriber A: 1 
  // Subscriber A: 2 
  // Subscriber B: 2 
  // Subscriber A: 3 
  // Subscriber B: 3 
  // Subscriber A: 4 
  // Subscriber B: 4 
  // Subscriber A: 5 
  // Subscriber B: 5 
  // Subscriber A: Completed 
  // Subscriber B: Completed

*/
import React, { useEffect, useState } from "react";
import { BehaviorSubject } from 'rxjs';

const API_SERVER = "http://localhost:8080";

export const jwt = new BehaviorSubject(null);
export const cart = new BehaviorSubject(null);

export const getCart = () =>
  fetch(`${API_SERVER}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      cart.next(res);
      return res;
    });

export const addToCart = (id) =>
    fetch(`${API_SERVER}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.value}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() => {
        getCart();
      });

export const clearCart = () =>
    fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.value}`,
    },
    })
    .then((res) => res.json())
    .then(() => {
        getCart();
    });

export const login = (username, password) =>
    fetch(`${API_SERVER}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        jwt.next(data.access_token);
        getCart();
        return data.access_token;
      });

export function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(!!jwt.value);
    useEffect(() => {
        setLoggedIn(!!jwt.value);
        return jwt.subscribe((c) => {
        setLoggedIn(!!jwt.value);
        });
    }, []);
    return loggedIn;
}

