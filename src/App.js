
import Header from './Compornent/Layout/Header';
import Footer from './Compornent/Layout/Footer';
import MenuLeft from './Compornent/Layout/MenuLeft';
import { useState } from "react";

function App(props) {
const [isLogin, setIsLogin] = useState();
  return (
    <>
      <Header isLogin={isLogin} />
      <section>
        <div className='container'>
          <div className='row'>
            <MenuLeft />
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
