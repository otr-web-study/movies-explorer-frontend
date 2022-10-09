import './Logo.css';
import Link from '../Link';

function Logo({className=''}) {
  return (
    <Link href='/' className={`link logo ${className}`} />
  )
}

export default Logo;