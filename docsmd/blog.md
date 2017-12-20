<h1>Syr Blog</h1>
<br/>

### Why React-Native Didn't Fit Well

Keeping a developer journal is something that I've been meaning to keep up with. But building the library and framework has been an amazing chore, and entertaining task at the same time! I thought it would be good to keep documenting the progress and the work that has been done to make something like Syr.

This project originated at PayPal. We originally had set out to write a new experience using the beloved React-Native. We iterated through several versions of React Native. From the early Teens to the late Forties. We came to the conclusion that as much as we really liked the ecosystem, the platform was not where we needed.

Ultimately we wanted create an SDK for Native applications. We had hoped to leverage React Native to drive multi-platform, javascript developer support, live updates, and more. While React Native had a bunch of upsides, it hadn't been created for our use case. We were trying to fit our feet into the wrong shoes.

Among the issues we ran into, a few really big ones were in our way. Size, trying to ship an SDK that is over 15mb to mobile platforms, this is generally a no go. Distribution, over time React Native hasn't had stellar support for integrating into existing applications, the surface area of the number of static libraries really put the hurt on our plans to send out a complete SDK.

With these pain points in mind, I set out to create Syr. An alternative, that would have a wildly different approach, while maintaining a similar set of principals. Over the coming months, I'll start to detail the decisions, and progress that was made with the library through more blog posts!

<br/>
<i>Written By <a href="http://www.twitter.com/dmikeyanderson" target="_new">Derek</a> on December 19, 2017</i>
