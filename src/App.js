import "./App.css";
import { useState } from "react";

function App() {
	const [appState, setAppState] = useState({
		loading: false,
		data: null,
	});
	const [search, setSearch] = useState({
		value: "",
	});
	const [exist, setExist] = useState();
	const findUser = (e) => {
		setSearch(e.target.value);
	};
	const submitUser = async (e) => {
		e.preventDefault();
		setAppState({ loading: false });
		const apiUrl = await fetch(`https://api.github.com/users/${search}`);
		if (apiUrl.status === 404) {
			setExist(false);
		} else {
			const data = await apiUrl.json();
			setAppState({
				loading: true,
				data: data,
			});
			setExist(true);
		}
	};
	const [bg, setBg] = useState({
		change: false,
		text: "light",
		icon: "uil uil-sun",
	});
	const changeBg = () => {
		document.body.classList.toggle("dark-theme");
		if (bg.change) {
			setBg({
				change: false,
				text: "light",
				icon: "uil uil-sun",
			});
		} else {
			setBg({
				change: true,
				text: "dark",
				icon: "uil uil-moon",
			});
		}
	};
	const date = (date) =>{
		return new Date(date).toDateString();
	}


	return (
		<div className="github__container">
			<div className="github__header">
				<h3 className="github__title">devfinde</h3>
				<div className="github__btn" onClick={changeBg}>
					{bg.text}
					<i className={bg.icon}></i>
				</div>
			</div>
			<form className="search__container" onSubmit={submitUser}>
				<i className="uil uil-search search__icon"></i>
				<input
					type="text"
					className="search__input"
					placeholder="Search Github username"
					onChange={findUser}
				/>
				<button className="search__button">Search</button>
			</form>
			{appState.loading && (
				<div className="user__container">
					<img
						src={appState.data.avatar_url}
						alt=""
						className="user__avatar"
					/>
					<div className="user__information">
						<div className="user__header">
							<div className="user__name">
								<h3>{appState.data.name}</h3>
								<span>@{appState.data.login}</span>
							</div>
							<p className="user__joined">
								joined {date(appState.data.created_at)}
							</p>
						</div>
						<div className="user__bio">{appState.bio}</div>
						<div className="user__stats">
							<div className="user__stat">
								<p>Repos</p>
								<span>{appState.data.public_repos}</span>
							</div>
							<div className="user__stat">
								<p>Followers</p>
								<span>{appState.data.followers}</span>
							</div>
							<div className="user__stat">
								<p>Folloring</p>
								<span>{appState.data.following}</span>
							</div>
						</div>
						<div className="user__contact">
							<div className="item__contact">
								<i className="uil uil-map-marker"></i>
								<p>{appState.data.location}</p>
							</div>
							<div className="item__contact">
								<i className="uil uil-twitter-alt"></i>
								<p>
									{appState.data.twitter_username !== null
										? appState.data.twitter_username
										: "no user twitter"}
								</p>
							</div>
							<div className="item__contact">
								<i className="uil uil-link"></i>
								<a
									href={appState.data.html_url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{appState.data.login}
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
			{exist === undefined ? (
				""
			) : !exist ? (
				<div className="user__container">Usuario no encontrado</div>
			) : (
				""
			)}
		</div>
	);
}

export default App;
