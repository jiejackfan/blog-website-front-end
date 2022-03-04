import React , {useState, useRef} from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {commentPost} from '../../actions/posts'

import useStyles from './styles'

const CommentSection = ({post}) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    // arrow function
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');
    }
    return (
        <div>
            <div>
                <div>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            {comment}    
                        </Typography>
                    ))}
                </div>
                {user?.result?.name &&
                    <div >
                        <Typography gutterBottom variant='h6'>Write a comment</Typography>
                        <TextField multiline rows={4} variant= 'outlined' label='Comment' fullWidth value={comment} onChange={(event)=> {setComment(event.target.value)}}/>
                        <Button style={{marginTop:'10px'}} fullwidth disabled={!comment} variant='contained' onClick={handleClick} color='primary'>Comment</Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CommentSection;