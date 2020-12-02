import React, { useState } from 'react';
import './NoteCard.css';
import { Button, createChainedFunction, IconButton } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';

function Note({ allUsers }) {
	const [ comment, setcomment ] = useState('');
	const [ star, setstar ] = useState(null);
	const [ hover, sethover ] = useState(null);
	const [ cart, setcart ] = useState([]);

	// const [mynotes, setmynotes] = useState([])
	const currentUser = JSON.parse(localStorage.getItem('userInfo'));
	const location = useLocation();
	const mynote = location.state.note;

	console.log(mynote._id);

	console.log(allUsers);
	// setmynotes(mynote)
	const user = console.log(mynote.experiences.review);

	const handleChange = (e) => {
		console.log(e.target.value);
		e.preventDefault();
		setcomment(e.target.value);
	};
	const userObject = allUsers.filter((current) => {
		return current._id == currentUser._id;
	});

	const arrCarts = userObject.map((cart) => {
		return cart.carts;
	});
	console.log(arrCarts);

	let carts;
	const allCarts = arrCarts.map((cart) => {
		return (carts = cart);
	});

	console.log(carts);
	const handleClick = () => {
		console.log(currentUser._id);
		fetch(`http://localhost:8000/users/carts/${currentUser._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${currentUser.token}`
			},
			body: JSON.stringify({
				category: mynote.category,
				label: mynote.label,
				price: mynote.price,
				note: mynote._id
			})
		}).then((res) =>
			res.json().then((data) => {
				setcart(data);
				let notearr = data.carts.map((itm) => {
					return itm.note;
				});
				console.log(notearr);
				let count = {};
				let newarr = [];
				for (var i = 0; i < notearr.length; i++) {
					var num = notearr[i];
					count[num] = count[num] ? count[num] + 1 : 1;
					newarr.push(count);
				}
				console.log(newarr);

				let sliceArr = newarr.splice(0, 1);
				console.log(sliceArr);
				sliceArr.map((element) => {
					return console.log(element.value);
				});
			})
		);
	};

	console.log(cart);

	// NEED HELP WITH REFRESH
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit');
		fetch(`http://localhost:8000/notes/experiences/${mynote._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${currentUser.token}`
			},
			body: JSON.stringify({
				rating: star,
				review: comment,
				user: currentUser._id,
				name: currentUser.name
			})
		})
			.then((res) => res.json())
			.then((data) => {
				mynote.experiences.push(data);
			});
	};
	console.log(mynote.experiences);
	console.log(comment);
	console.log(star);
	console.log(hover);
	return (
		<div className="notes">
			<div className="note">
				<h3>{mynote.category}</h3>
				<h4>{mynote.label}</h4>
				<p>{mynote.content}</p>
				<h4>
					<strong>{`$${mynote.price}`}</strong>
				</h4>

				<IconButton onClick={handleClick}>
					<FontAwesomeIcon icon={[ 'fas', 'cart-plus' ]} />
				</IconButton>
				<div>
					<h2>Reviews</h2>
					{mynote.experiences.map((exp) => {
						return (
							<p>
								{exp.name}:{exp.review}
							</p>
						);
					})}
					<form onSubmit={handleSubmit}>
						<h3>{currentUser.name}:</h3>
						<input onChange={handleChange} />

						{[ ...Array(5) ].map((star, i) => {
							const ratingvalue = i + 1;
							return (
								<label>
									<input type="radio" name="rating" value={ratingvalue} />
									<StarRoundedIcon
										style={{ color: ratingvalue <= (hover || star) ? '#ffd369' : '#bbbbbb' }}
										onClick={() => setstar(ratingvalue)}
										onMouseEnter={() => sethover(ratingvalue)}
										onMouseLeave={() => sethover(null)}
									/>
								</label>
							);
						})}

						<button type="submit">ENTER</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Note;
