# dragons ahead

native javascript widgets for mousenative bridges. expermentation for an agnostic implimentation of abstract view engine

# goal

* minimally viable to the goal of native checkout
* render agnostic, web, native with one code base (mobile first)

### mvp roadmap

* web raster
* native raster (ios, android)

# DOCs

These will serve as minimal docs for api for now. Trying to JSDOC the source as well to generate source docs. 

### AST

`MouseJS` uses constructed javascript objects to hold representation of the application UI. When requested, `MouseJS` will generate an AST from the root level view, and provides this to a `Raster`. `MouseJS` currently has these rasters; `dom`, `ast`, `ios` (external repo).

The AST Interface is shown below. Any raster could be created to support this AST. Checkout `mousenative-ios` for an IOS implimentation of a `Raster`.

```json
{
  "type" : "",
  "children" : [],
  "style" : {
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    backgroundColor: "#000000" // expanded formatted hex only support atm (mvp)
  }
}
```