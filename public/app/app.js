import "./ultils/array-helpers.js";

import { notasService as service } from "./nota/service.js";
import {
  debounceTime,
  partialize,
  pipe,
  takeUntil,
} from "./ultils/operators.js";
import { timeoutPromise, retry } from "./ultils/promisse-helpers.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() =>
  retry(3, 3000, () => timeoutPromise(200, service.sumItems("2143")))
    .then(console.log)
    .catch(console.log)
);

document.querySelector("#myButton").onclick = action;
