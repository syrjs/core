<h1>Syr Blog</h1>
<br/>

## Syr On The Inside, How Syr Renders Part 1

A Deeper Dive into how Syr renders and constructs instances. Syr uses a `Virtual-DOM` like structure. This is the `Instance-Tree` for the application.

When using Syr, a `Component` is defined. This base `Component` is then constructed at `run-time` and represents the application for the entirety of its existence inside the `Guest` system. We transport messages with this structure to the `Host` system, where rendering is setup.

A basic component defined in Syr.

```javascript
class MyComponent extends Component {
    render() {
        return <View>Hello World</View>;
    }
}
```

Since JavaScript constructors are sugared function constructors we end up with an object with a `render` function attached that will return an AST structure.

<h3>What about the JSX?</h3>

If you're not familiar with `JSX`, a quick recap is that it is a way for us to represent JavaScript `Classes` in an elegant composition based manner.

Syr ships with a `JSX` transform for `Babel`. We've forked this implementation from `babel-plugin-transform-jsx` by Caleb Meredith. One feature added is `UUID` at transpile time. We leverage this to recompute state without needing to diff a tree and transport those changes to the Host system.

Syr transpiles `JSX` directly into an AST tree. Following is an example of what JSX looks like, and what the corresponding tree looks like after going through `Babel`.

```javascript
<View>
    <Text>Hello World</Text>
</View>
```
Converts into
```javascript
{
    elementName: function(), // instanceof View
    attributes: {},
    children: [
        {
            elementName: function(), // instanceof Text
            attributes: {},
            children: []
        }
    ]
}
```

<h3>We have an AST Tree now what?</h3>

When the application is parsed and loaded, it sits idle until the developer executes the `Render` method.

```javascript
Render(MyComponent);
```

This method takes the AST from the component and creates instances of the classes for the tree. It then uses the `JavaScript to Native Bridge` to send messages containing the UI structure. 

Syr's `Host` Bridge implementations receive the AST Tree representing the UI. The Bridge sends this tree to the Raster, where the elements are constructed on the `Host` environment, and cached against the `UUID` for later state control. 

The `Host` environment attaches these controls to a `RootView`, and once complete sends a message back to the `Guest` environment, informing it of the `UUID` which was constructed and rendered, and kicks off the `componentDidMount` lifecycle event.

The `Host` environment and the `Guest` environment exchange a series of messages that continue while the application is executing. We'll continue to break those Classes down in future posts, stay tuned!

Want to contribute? Head over to our <a href="https://github.com/dmikey/syr/issues" target="_new">issues</a> page, and grab one to work on today! Any contribution welcome!

<br/>
<i>Written By <a href="http://www.twitter.com/dmikeyanderson" target="_new">Derek</a> on January 5, 2018</i>
<br/><br/><hr/><br/>
## Why React-Native Didn't Fit Well

Keeping a developer journal is something that I've been meaning to keep up with. But building the library and framework has been an amazing chore, and entertaining task at the same time! I thought it would be good to keep documenting the progress and the work that has been done to make something like Syr.

This project originated at PayPal. We originally had set out to write a new experience using the beloved React-Native. We iterated through several versions of React Native. From the early Teens to the late Forties. We came to the conclusion that as much as we really liked the ecosystem, the platform was not where we needed.

Ultimately we wanted create an SDK for Native applications. We had hoped to leverage React Native to drive multi-platform, javascript developer support, live updates, and more. While React Native had a bunch of upsides, it hadn't been created for our use case. We were trying to fit our feet into the wrong shoes.

Among the issues we ran into, a few really big ones were in our way. Size, trying to ship an SDK that is over 15mb to mobile platforms, this is generally a no go. Distribution, over time React Native hasn't had stellar support for integrating into existing applications, the surface area of the number of static libraries really put the hurt on our plans to send out a complete SDK.

With these pain points in mind, I set out to create Syr. An alternative, that would have a wildly different approach, while maintaining a similar set of principals. Over the coming months, I'll start to detail the decisions, and progress that was made with the library through more blog posts!

<br/>
<i>Written By <a href="http://www.twitter.com/dmikeyanderson" target="_new">Derek</a> on December 19, 2017</i>
