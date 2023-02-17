import React, {useState, useEffect} from 'react';

import {Loader, Card, FormField} from "../components";

const CardRenders = ({data, title}) => {
    if(Array.isArray(data) && data.length > 0) {
    return data.map((post) => <Card key={post._id} {...post}/>)}
    else{
        return(<h2 className = "mt-3 font-bold text-[#ff6c47] text-xl uppercase">{title}</h2>)
    }
}




const Home = () => {

//use state fields
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setsearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

//search function

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);
    setSearchTimeout(
    setTimeout(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())
        || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

        setSearchedResults(searchResults);
    }, 500));
}
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://intellipaint.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto ">
            <div className = "bg-gradient-to-r from-slate-50 via-purple-100 to-slate-50">
                <h1 className="font-extrabold text-[#000000] text-[32px] text-center">Public Community Art</h1>
                <p className="mt-2 text-[#000000] text-[17px] text-center"> See the public portfolio of artwork made by AI!</p>
            </div>
            <div className = "mt-16">
                <FormField 
                labelName= "Explore some art!"
                type = "text"
                name ="text"
                placeholder = "Search for art here"
                value = {searchText}
                handleChange = {handleSearchChange}
                />

            </div>

            <div className = "mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                     {searchText && (
                        <h2 className = "font-medium text-[666e69] text-xl mb-3">Here is some art related to <span className = "text-[#222328]">{searchText}</span>!</h2>
                     )}
                     <div className="grid lg:-grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchText ? (
                        <CardRenders 
                            data = {searchedResults} 
                            title = "No results found"
                        />
                        ):
                        (
                        <CardRenders 
                        data={allPosts} 
                        title = "No images found" 
                        />
                        
                    )
                    }
                     </div>
                    </>
                )
            }
            </div>
    </section>
  )
}

export default Home