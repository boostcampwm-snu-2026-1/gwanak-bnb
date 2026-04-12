import React from 'react';
import './SpotPopup.css'; 

export default function SpotPopup({ list, onItemClick }) {
    return (
        <div className="spot-popup">
            {list.length === 0 ? (
                <div className="empty-result">검색 결과가 없습니다.</div>
            ) : (
                <ul className="spot-list">
                {list.map((item) => (
                    <li 
                    key={item.id}
                    onClick={() => onItemClick(item.name)} 
                    className="spot-item" 
                    >
                    <span className="icon">📍</span>
                    <span className="name">{item.name}</span>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}