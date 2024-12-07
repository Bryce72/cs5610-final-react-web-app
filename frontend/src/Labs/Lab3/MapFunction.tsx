export default function MapFunction() {
    let numberArray1 = [1, 2, 3, 4, 5, 6];
    const square = (a: number) => a * a;
    const todos = ["Buy milk", "Feed the pets"];
    const squares = numberArray1.map(square).toString(); // Added toString() cause without it made me cringe
    const cubes = numberArray1.map((a) => a * a * a).toString();
    return (
      <div id="wd-map-function">
        <h4>Map Function</h4>
        squares = {squares} <br />
        cubes = {cubes} <br />
        Todos:
        <ol>
          {todos.map((todo) => (
            <li>{todo}</li>
          ))}
        </ol> <hr/>
      </div>
    );
  }
  