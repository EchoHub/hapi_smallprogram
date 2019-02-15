const a = 1;
class A {
   render() {
    this.a()
   }
   a = () => {
       console.log(1)
   }
}

const test = new A()
test.render()