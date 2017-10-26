# ![](https://user-images.githubusercontent.com/328000/29147428-d6619ef2-7d1b-11e7-9cbd-286b7ae5fe49.png) Syr
### Preamble and Ramble

Simply put, Syr is a light weight, reduced implimentation of the React-Native pattern. Currently running on iOS only, Android and Web coming.

The target user of Syr, is a 3rd Party Experience developer, who is creating SDKs for other apps. That developer wants to be able to update those experiences without needing ot require the SDK be reintegrated for simple changes, like business logic, and look and feel.

Using SyrSDK, apps are written in JavaScript. They are built using familiar tools like `webpack` and Syr uses a superset of the familiar `React-Native` Api.

Distrbute Business Logic and UI updates over the wire with the built in bundle manager inside Syr.


### Why Another Web to Native Framework JS Bridge Thing?

The story is as old as the hills. We couldn't find that one tool that fit right into our workflow. So we struck out - and made it. We couldn't find another dynamic JavaScript Engine that offered us any of the advantages we required, over React-Native. So we stuck with React-Native for a long time.

Eventually, we decided we needed to strike out on our own, as React-Native started to fork from our ideals. React-Native required large amounts of overhead to integrate into existing projects - we're trying to ship SDKs, this just isn't working well.

We didn't want to write our SDK natively, and then distribute it to React-Native users. We wanted to write our SDK in React-Native and ship it without the React-Native dependecy. Sound Familiar?

We tried to internalize the code base, but then quickly realized that if we wanted to keep up with changes to iOS(Android), then we had to accept that ReactNative's changes were indeed needed. Which meant internalizing every release going forward.

It quickly became too much, and we took a breath. Surveyed the land, and decided that we needed to accomplish some goals.

* Size. We're shipping SDKs, not Packed Apps. Our End Users are not looking at adding 5 megabytes simply for a payments experience they can throw in the native web browser.

* Portability. We've quickly learned that the surface area of React-Native was far too wide for us to approach gracefully. The addition of C libraries like Boost, really put the hurt on us since we didn't actually want to live inside a React Eco system. We want to be inside 3rd party; Swift and ObjectiveC and Java apps.

* Look, Smell and Feel like React. React is a hot API right now. It feels familiar to those who use it, and because of it's popularity it's a pattern that is easy to get aquanted with. We knew we needed to maintain a certin compatibility with it's predicatble interface.

These we're the goals in mind for `SyrSDK`. Thanks to the openess of the internet, we've been able to borrow details on implimentation from places like `ReactNative` so we suspect you'll find it's in working order.

Come help contribute! PULL REQUESTS WANTED!
