import { useState } from "react"
import { useHistory } from "react-router"

const Landing = ({setName,setRoom}) =>{

    const history = useHistory()

    const [inputVal,setInputVal] = useState('')
	const [selectVal,setSelectVal] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        setName(inputVal)
		setRoom(selectVal)
        history.replace('/chat')
    }

    return(
        <div className="join-container">
			<header className="join-header">
				<h3>Chatzy</h3>
			</header>
			<main className="join-main">
				<form onSubmit={e=>handleSubmit(e)}>
					<div className="form-control">
						<input className='username' type="text" placeholder="Name" required
				        value={inputVal} onChange={e=>setInputVal(e.target.value)}/>
					</div>
					<select value={selectVal} onChange={e=>setSelectVal(e.target.value)} required>  
						<option hidden value=''> Choose Room </option>
						<option value='Anime'> Anime </option>
						<option value='Movies'> Movies </option>
						<option value='Series'> Series </option>
						<option value='Songs'> Songs </option>
						<option value='Books'> Books </option>
					</select>
					<button type="submit" className="btn btn-success">Join Chat</button>
				</form>
			</main>
		</div>
    )
}

export default Landing