
function  D() {
}

function E() {

}

function  C() {
  return (
    <D></D>
  )
}

function B() {
  return (
    <D>
      <C>
        <E></E>
      </C>
      <C>
        <E></E>
      </C>
    </D>
  )
}

function A() {
  return (
    <B></B>
  )
}