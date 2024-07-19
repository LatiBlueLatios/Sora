# Haruka: Web Components, Hold the Bloat

## What the heck is Haruka?

Haruka is a bare-bones, no-frills web component manager for developers who think vanilla JS is the best flavor. It's like a Swiss Army knife for web components – small, sharp, and ready to cut through the BS.

## Why would I use this instead of [insert trendy framework]?

- You're allergic to node_modules folders that are bigger than your actual project.
- You think "vanilla JS" sounds delicious.
- You enjoy understanding every line of code you're using (weirdo).
- You believe the best framework is the one you build yourself.

## How do I use this bad boy?

1. First, clone this repo (or just copy-paste the code, we won't judge).

2. Import Haruka into your project:

    ```javascript
    import Haruka from './path/to/Haruka.js';
    ```

3. Create your component by extending Haruka:

    ```javascript
    class MyAwesomeComponent extends Haruka {
        constructor() {
            super('my-awesome-template');
            this.state = {
                awesomeness: 9000
            };
        }

        render() {
            this.element.querySelector('.awesome-meter').textContent = this.state.awesomeness;
        }

        increaseAwesomeness() {
            this.setState({
                awesomeness: this.state.awesomeness + 1
            });
        }
    }
    ```

4. Use your component:

    ```javascript
    const myComponent = new MyAwesomeComponent();
    myComponent.appendTo('#app');
    myComponent.increaseAwesomeness();
    ```

4.Bask in the glory of your lightweight, framework-free component.

## What can Haruka do?

It can:

- Fetch templates: Because writing HTML in JavaScript is for masochists.
- Manage state: Like React, but without needing a supercomputer to run it.
- Handle events: It plays nice with SoulDew, your friendly neighborhood event handler..
- Manipulate the DOM.
- Show/hide elements.

## Use Cases

- Building a portfolio site that doesn't take 10 seconds to load.
- Creating a web app that runs smoothly on your grandma's computer.
- Impressing that one developer friend who scoffs at anything that's not hand-coded.
- Teaching beginners how components work without melting their brains.

## How Haruka Reflects Vanilla JS Values

1. Minimalism: Haruka is smaller than your average npm package's readme file.
2. Control: With Haruka, you're the boss. No magic, no surprises, just good ol' JavaScript.
3. Performance: It's fast because it does less. Revolutionary concept, we know.
4. Learning: Using Haruka means understanding Haruka. No stack overflow copy-pasting here!
5. Flexibility: Extend and modify to your heart's content. It's your playground.

## Planned Features

- Integration with Sakura when I finish its development.
- Revisit after I've had enough experience using this module.

## Inspiration

Inspiration for this module comes from the Lit library, some of React's features such as Hydration (they have good intentions but are implemented horribly), and Zombs.io's UiComponent class.

## Final Words

Haruka isn't here to replace your beloved frameworks or to solve all your problems. It's here to remind you that sometimes, less is more. It's for developers who enjoy the challenge of doing more with less, who believe in understanding their tools, and who think the best code is the code you don't have to write.
