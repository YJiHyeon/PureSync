import React, { useState, useRef, useCallback } from 'react'
import { Card, Button, Input } from 'components/ui'
import axios from 'axios';

const ArticleAction = (props) => {
    const commentInput = useRef();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const onHelpfulClick = useCallback((event) => {
      const val = event.target.value;
      setComment(val); 
  }, []);

    const onCommentSubmit = () => {
      console.log(comment);
      axios.post(`http://localhost:9000/api/board/${props.data}/comments`,  { cmtContents: comment } 
      , {
        headers: {
          'Content-Type': 'application/json', 
        },
      })
      .then((res)=>{
        console.log(res.data);
        setComments((prevComments) => [...prevComments, res.data]);
        setComment('');
        props.commentRegister(); //부모한테 나 글등록했다.
      })
            
        
      };
      return (
        <div className="mt-12">
          <h3 className="mb-4">댓글</h3>
          <Input ref={commentInput} placeholder=" " value={comment} textArea onChange={onHelpfulClick} />
          <div className="mt-3 flex justify-end">
            <Button onClick={onCommentSubmit} variant="solid" style={{ width: '100px', height: '30px', fontSize: '14px', padding: '5px' }}>
              댓글 등록
            </Button>
          </div>
        </div>
      );
    };

export default ArticleAction
