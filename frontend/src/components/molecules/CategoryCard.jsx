import { Link } from 'react-router-dom';

export const CategoryCard = ({ icon, title, path }) => {

    return (
        <Link
            to={path}
            className='flex flex-col items-center justify-center gap-3 bg-neutral-white border border-gray-200 rounded-2xl p-6 min-w-35 flex-1 hover:border-secondary hover:shadow-md transition-all group'
        >
            <div className='w-16 h-16 rounded-full bg-neutral-white flex items-center justify-center text-secondary group-hover:scale-110 transition-transform'>
                {icon}
            </div>
            <span className='font-spartan font-bold text-sm text-primary'>
                {title}
            </span>
            
        </Link>
    )
}