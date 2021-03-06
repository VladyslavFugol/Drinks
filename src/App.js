import { Route, Routes } from 'react-router-dom'
import { MainPage, AppHeader, SingleDrink } from 'views/index'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.wrapper}>
      <AppHeader/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/:drinkId' element={<SingleDrink/>}/>
      </Routes>
    </div>
  );
}

export default App;
