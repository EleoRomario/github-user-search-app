import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [appState, setAppState] = useState({
		loading: false,
		data: null,
	});
	const [search, setSearch] = useState({
		value: "",
	});
	const findUser = (e) => {
		setSearch(e.target.value);
  };
	const submitUser = (e) => {
		e.preventDefault();
		setAppState({ loading: false });
		const apiUrl = `https://api.github.com/users/${search}`;
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setAppState({
					loading: true,
					data: data,
				});
			});
      console.log(appState.data);
	};

	return (
		<div className="github__container">
			<div className="github__header">
				<h3 className="github__title">devfinde</h3>
				<div className="github__btn">
					light
					<i className="uil uil-sun"></i>
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
							<p className="user__joined">joined 25 jan 2012</p>
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
								<a href={appState.data.html_url} _blank>
									{appState.data.login}
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
