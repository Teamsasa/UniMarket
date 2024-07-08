import React from 'react';

const Header: React.FC = () => {
  console.log('Header render');
  return (
    <header className="header">
      <div className="logo">Uni Market</div>
      <div className="search-bar">
        <input type="text" placeholder="何をお探しですか？" />
        <button>検索</button>
      </div>
      <div className="button-group">
        <button className="login">ログイン</button>
        <button className="register">会員登録</button>
        <button className="sell">出品</button>
      </div>
    </header>
  );
};

export default Header;
