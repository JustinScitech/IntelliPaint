import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { preview } from '../assets';
import {findRandPrompt} from '../utils';
import {FormField, Loader} from '../components';
//import { formatPostcssSourceMap } from 'vite';



const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({name:'', prompt: '', photo: '',});
    const [generatingImg, setGeneratingImg] = useState(false);
    const [Loading, setLoading] = useState(false);


    //submits image to the community hub
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.prompt && form.photo){
            setLoading(true);
            
            try{
              const response = await fetch('https://intellipaint.onrender.com/api/v1/post', 
              {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(form),})  
              await response.json();
              navigate('/');
            } catch (error){
                alert(error);
            } finally{
                setLoading(false);
            }
        } else{
            alert('Enter a promp please');
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

//generates AI image

    const generateImage = async () => {
        if(form.prompt){
            try{
                setGeneratingImg(true);
                const response = await fetch('https://intellipaint.onrender.com/api/v1/dalle', 
                {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({prompt: form.prompt}),});
                    const data = await response.json();
                    setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch(error){
             alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else{
            alert('Hey! You gotta enter a prompt!');
        }

    };
//generates random prompt in prompt textbox

    const handleSurpriseMe = () => {
        const randomPrompt = findRandPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt});
    }

  return (
    <section className = "max-w-7xl mx-auto">
        <div>
            <h1 className="font-extrabold text-[#222328] text-[32px] text-center">Creation Page!</h1>
            <p className="mt-2 text-[#666e75] text-[17px] text-center"> Use AI to make some artwork!</p>
        </div>
        <form className = "mt-16 max-w-3xl" onSubmit={handleSubmit}>
            <div className = "flex flex-col gap-5">
                <FormField 
                labelName = "Your Name"
                type = "text"
                name = "name"
                placeholder = "Anujan Kopu"
                value = {form.name}
                handleChange = {handleChange}
                />
                <FormField 
                labelName = "Prompt"
                type = "text"
                name = "prompt"
                placeholder = "A couple dancing in Toronto"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
                />
                <div className = "relative bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                    {form.photo ? (
                        <img src={form.photo} alt={form.prompt} className = "w-full h-full object-contain"/>
                    ): (
                        <img src={preview} alt = "preview" className = "w-8/12 h-9/12 object-contain opacity-40" />
                    )}

                    {generatingImg && (
                        <div className = "absolute inset-0 z-0 flex justify-center rounded-lg items-center bg-[rgba(0,0,0,0.5)]">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
            <div className = "mt-5 flex gap-5">
            <button type="button" onClick={generateImage} className = "text-white bg-green-300 font-medium rounded-md text-xl w-full sm:w-auto px-20 py-2.5 text-center">
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
            </div>
        
        <div className = "mt-10">
            <p className = "mt-2 text-gray-400">
                You can share this with other people! Click below!
            </p>
            <button type="submit" className = "bg-purple-500 text-white py-2 mt-5" onClick={handleSubmit}>
                {Loading ? 'Sharing image..' : 'Share the image!'}
            </button>
        </div>
        </form>
    </section>
  )
}

export default CreatePost