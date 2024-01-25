import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

const PageNotFoundPage = () => {
  return (
    <>
        <Helmet>
            <title>404 - Page Not Found</title>
        </Helmet>
        <div className='h-screen flex justify-center items-center'>
            <div>
                <div>
                    <h3 className='text-xl font-[600] text-center'>404</h3>
                    <p>Page Not Found</p>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() =>history.back()} className='flex justify-center items-center text-blue-500 font-[600] gap-2'><FontAwesomeIcon icon={faArrowAltCircleLeft}/> Go back</button>
                </div>
            </div>
        </div>
    </>
 )
}

export default PageNotFoundPage;