import React from 'react'
import { Container, AdaptableCard } from 'components/shared'
import { HiOutlineClock } from 'react-icons/hi'
import { Card, Button, Input } from 'components/ui'

const ArticleComment = ({ data }) => {
    if (data.comment && Array.isArray(data.comment)) {
      return (
        <div className="mt-5">
          {data.comment.map((comment) => (
            <div style={{ marginBottom: '10px' }}>
                <div className="flex items-center justify-between mb-4">
                  <p>작성자: {data.memId}</p>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-2">
                      <HiOutlineClock className="text-lg" />
                      <span>
                      {comment.cmtWdate}
                      </span>
                    </span>
                    <Button variant="twoTone" size="xs" color="red-600" >삭제</Button>
                  </div>
                </div>

                <div className="mb-2">댓글: {comment.cmtContents}</div>
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