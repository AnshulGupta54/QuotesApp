import { useState, useEffect, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useParams } from 'react-router-dom';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params=useParams();
  const{sendRequest,status,data: loadedComments}= useHttp(getAllComments);

  const {quoteId}=params;

  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest,quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addCommentHandler=useCallback(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId]);
  let comments;
  if(status==='pending'){
    comments=<div className='centered'><LoadingSpinner /></div>
  }
  if(status==='completed' && (loadedComments && loadedComments.length>0)){
    comments=<CommentsList comments={loadedComments} />
  }
  if(status==='completed' && (!loadedComments || loadedComments.length===0)){
    comments=<div className='centered' >No comments were added yet</div>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddComment={addCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
