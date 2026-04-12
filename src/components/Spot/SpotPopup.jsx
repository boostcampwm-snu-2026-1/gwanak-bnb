import React from 'react';
import './SpotPopup.css'; 

export default function SpotPopup({ list, onItemClick, keyword, selectedSpot }) {
    return (
        <div className="spot-popup">
            <div className="popup-title">
				{keyword === "" ? "추천 여행지" : `'${keyword}' 검색 결과`}
			</div>
            {list.length === 0 ? (
                <div className="empty-result">검색 결과가 없습니다.</div>
            ) : (
                <ul className="spot-list">
                    {list.map((item, index) => (
                        <li 
                            key={item.id}
                            onClick={() => onItemClick(item.name)} 
                            className={`spot-item ${index === selectedSpot ? 'focused' : ''}`} 
                        >
                            <div className="spot-info">
								<div className="name">{item.name}</div>
								{item.desc && <div className="desc">{item.desc}</div>}
							</div>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}