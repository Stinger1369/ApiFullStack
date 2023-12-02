import { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import './ThemeControl.scss';

export default function ThmeControl() {
    const { theme, setTheme } = useContext(ThemeContext)
    return <>
        <button className='btn btn-info theme-control'>
            ChangeTheme
        </button>
    </>
}