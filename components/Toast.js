import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function Toast(){
  const notify = () => toast("Wow so easy !");

  return (
  <ToastContainer />
  );
}