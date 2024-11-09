
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
return Array(6).fill({}).map((_, index) => (
<div className='col-4 text-center p-5' key={index}>
<Skeleton className='mb-4' height={400} width={300} />    
{/* <Skeleton className='mb-2' height={30} count={2} /> */}
</div>
));
}

export default Loading;