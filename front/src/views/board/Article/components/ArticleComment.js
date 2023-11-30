import React from 'react'
import { Container, AdaptableCard } from 'components/shared'

const ArticleComment = ({ data }) => {
    if (data.comment && Array.isArray(data.comment)) {
      return (
        <div>
          {data.comment.map((comment) => (
            <div style={{ marginBottom: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p>작성자: {data.memId}</p>
                  <span>댓글: {comment.cmtContents}</span>              
                </div>
                <span style={{ marginLeft: 'auto' }}>작성 시간: {comment.cmtWdate}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      );
    } else {
     
      return <div></div>;
    }
  };

export default ArticleComment