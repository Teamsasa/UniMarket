import React, { useState } from 'react';

import {api_url} from '../index';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // リクエストオブジェクトを作成
      var request = new Request(api_url + "/signin", {
        credentials: 'include',
      });

      const response = await fetch( request, {//正しいパスを指定する
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      // const data = await response.json();
      // console.log('Login successful:', data);
      console.log('Login successful:', response);
      alert('ログインに成功しました');
      // ここでログイン後の処理を行う（例：ユーザー状態を更新する、リダイレクトするなど）
    } catch (error) {
      alert('ログインに失敗しました');
      console.error('Error during login:', error);
      console.log(JSON.stringify({ username, password }));
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">ユーザー名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;