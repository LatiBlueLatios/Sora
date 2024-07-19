# Haruka: The Nitty-Gritty Guide

## The Haruka Class: Your New Best Friend

First things first, let's break down this bad boy:

```javascript
class Haruka extends SoulDew {
    constructor(templateName) {
        super();
        this.templateName = templateName;
        this.element = null;
        this.state = {};
        this.init();
    }
    // ... more awesome stuff here
}

```

### Constructor

- `templateName`: Pass in the name of your HTML template. Don't worry, we'll fetch it for you because we're nice like that.
- `this.element`: This'll hold your component's DOM element. It starts as null because we're not magicians.
- `this.state`: Your component's brain. Store your real-time interactive data here.

### Methods

#### `async init()`

This is where the magic happens. It fetches your template, creates your element, and calls `render()` and `onMount()`. It's asynchronous because, you know, JavaScript.

#### `handleError(error)`

When shit hits the fan, this method catches it. Override it if you want to handle errors on your own.

#### `onMount()`

Called after initialization. Perfect for setting up event listeners or fetching initial data. Override this or forever hold your peace.

#### `setState(newState)`

Update your component's state. It's like React's setState, but without the therapy bills.

```javascript
this.setState({ count: this.state.count + 1 });
```

#### `render()`

The star of the show. Override this to update your component's DOM. It's called automatically after `setState()`, because we're thoughtful like that.

```javascript
render() {
    this.element.querySelector('.count').textContent = this.state.count;
}
```

#### `hydrate()`

Adds interactivity to your component. It looks for `data-action`attributes and sets up event listeners. Use it like this in your HTML:

```html
<button data-action="incrementCount">Click me!</button>
```

And in your component:

```javascript
incrementCount() {
    this.setState({ count: this.state.count + 1 });
}
```

#### `appendTo(selector)`

Slaps your component into the DOM. Just give it a CSS selector and watch the magic happen.

```javascript
myComponent.appendTo('#app');
```

#### `show()`, `hide()`,`isVisible()`

Ain't it obvious?

#### `destroy()`

The grim reaper of components. Cleans up event listeners and removes the element from the DOM. Call this when you're done with your component, or when it's been very, very bad.

## Things to Keep in Mind (AKA The "Don't Shoot Yourself in the Foot" Section)

1. **Async Initialization** : `init()` is async, but it's called in the constructor. This means your component might not be ready immediately after creation. If you need to do something right after initialization, use the `onMount()` method.
2. **Template Fetching** : Haruka expects your templates to be in a `templates`folder. If you put them somewhere else, you're on your own, buddy.
3. **State Updates** : `setState()` triggers a re-render. If you're updating state in your `render()` method, congratulations, you've just created an infinite loop. Don't do that.
4. **Event Handling** : Haruka uses SoulDew for event handling. If you don't know what that is, go read its docs. We'll wait.
5. **CSS** : Haruka doesn't handle CSS for you. You're a big kid now, you can manage your own stylesheets.
6. **Lifecycle** : There's no complex lifecycle here. You get `onMount()` and `destroy()`. If you need more, you might be overengineering. Take a deep breath and simplify.
7. **Error Handling** : Haruka will catch errors, but it won't fix your bugs. That's still your job, sorry.
