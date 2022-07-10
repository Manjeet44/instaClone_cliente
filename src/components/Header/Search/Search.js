import React, {useState, useEffect} from 'react';
import { Search as SearchSU, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../gql/user';
import './Search.scss';
import ImageNoFound from '../../../assets/png/avatar.png';

export default function Search() {
    const [search, setSearch] = useState(null);
    const [result, setResult] = useState([])
    const {data, loading} = useQuery(SEARCH, {
        variables: {search}
    });
    
    useEffect(() => {
        if(data?.search.length > 0) {
            const users = [];
            data.search.forEach((user, index) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar
                });
            });
            setResult(users);
        } else {
            setResult([]);
        }

      }, [data])

    

    const onChange = (e) => {
        if(e.target.value) {
            setSearch(e.target.value)
        } else {
            setSearch(null)
        }
    }

    const handleResultSelect = () => {
        setSearch(null);
        setResult([]);
    }

  return (
    <SearchSU
        className='search'
        fluid
        input={{icon: 'search', iconPosition: 'left'}}
        loading={loading}
        value={search || ''}
        onSearchChange={onChange}
        results={result}
        onResultSelect={handleResultSelect}
        resultRenderer={(e) => <ResultSearch data={e} /> }
    />
  )
}

function ResultSearch({data}) {
    
    return (
        <Link className='search__item' to={`/${data.username}`}>
            <Image src={data.avatar || ImageNoFound} />
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    )
}
