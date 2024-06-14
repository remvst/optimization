![Build status](https://github.com/remvst/optimization/actions/workflows/check.yaml/badge.svg)

# optimization

Various optimizations utils.

## Installation

```sh
npm install @remvst/optimization
```

## ReusablePool

```typescript
// Create a pool
const pool = new ReusablePool(() => createComplexObject());

// (Optional) Prepare a few objects ahead of time
pool.prepare(10);

// Retrieve an object from the pool
const myObject = pool.take();

// Give the object back to the pool
pool.give(myObject);
```

## ThrottledValue

```typescript
// Create a lazy reference
const expensiveObject = lazy(() => createComplexObject());

// Use the reference
expensiveObject.get().doStuff();

// (Optional) Provide a cleanup mechanism
const expensiveObjectWithReset = lazy(
    () => createComplexObject(),
    (obj) => obj.destroy(),
);
expensiveObject.reset();
```

## ThrottledValue

```typescript
const throttled = new ThrottledValue(
    1, // Compute every 1s
    () => performance.now() / 1000, // Provide the current time
    () => doAnExpensiveCalculation(), // Provide the computed value
);

// First call will trigger doAnExpensiveCalculation()
const currentValue = throttled.get();

// Second call will only trigger doAnExpensiveCalculation() if 1s has passed
const newValue = throttled.get();

// (Optional) Reset when relevant
throttled.reset();
```

## ValueChangeHelper

```typescript
const languageValue = new ValueChangeHelper<string>();

// requiresUpdate() will only return true if the value is new
// or different from the previous one
if (languageValue.requiresUpdate(navigator.language)) {
    translateEverything(languageValue.get());
}

// (Optional) Reset when relevant
languageValue.reset();
```
