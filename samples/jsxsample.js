function D() {}

function E() {}

function C() {
  return <D />;
}

function B() {
  return (
    <D>
      <C>
        <E />
      </C>
      <C>
        <E />
      </C>
    </D>
  );
}

function A() {
  return <B />;
}
