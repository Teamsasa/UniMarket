import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { api_url } from '../index';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch( api_url + "/getProducts?="+searchQuery, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      console.log('Search results:', data);
      // ここで検索結果を処理します（例：状態を更新する、結果を表示するなど）
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // ログイン情報をここに追加します（例：{ username: '...', password: '...' }）
  //       body: JSON.stringify({}),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Login failed');
  //     }
  //     const data = await response.json();
  //     console.log('Login successful:', data);
  //     // ここでログイン後の処理を行います（例：ユーザー状態を更新する、リダイレクトするなど）
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };

  // const handleRegister = async () => {
  //   try {
  //     const response = await fetch('/api/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // 登録情報をここに追加します（例：{ username: '...', password: '...', email: '...' }）
  //       body: JSON.stringify({}),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Registration failed');
  //     }
  //     const data = await response.json();
  //     console.log('Registration successful:', data);
  //     // ここで登録後の処理を行います（例：ユーザー状態を更新する、ログインページにリダイレクトするなど）
  //   } catch (error) {
  //     console.error('Error during registration:', error);
  //   }
  // };

  return (
    <header className="header">
      <Link to="/" className="logo">Uni Market</Link>
      <div className="search-bar">
        <input
          type="text"
          placeholder="何をお探しですか？"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>検索</button>
      </div>
      <div className="button-group">
        <Link to="/login" className="button login-button">ログイン</Link>
        <Link to="/register" className="button register-button">会員登録</Link>
        <Link to="/upload" className="button sell-button">出品</Link>
      </div>
    </header>
  );  
};

export default Header;
