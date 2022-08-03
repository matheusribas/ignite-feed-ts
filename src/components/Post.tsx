import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  publishedAt: Date;
  content: Content[]
}

export function Post({ author, publishedAt, content } :PostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'ás' HH:mm'h'", { 
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateComment(event: FormEvent) {
    event.preventDefault();

    setComments(oldState => [...oldState, commentText]);
    setCommentText('')
  }

  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setCommentText(event.target.value)
  }

  function handleCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(content: string) {
    setComments(oldState => {
      return oldState.filter(comment => comment !== content)
    });
  }

  const isCommentTextEmpty = !commentText.length
  
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={publishedDateFormatted} 
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='Escreva um comentário...'
          value={commentText}
          onChange={handleCommentChange}
          onInvalid={handleCommentInvalid}
          required
        />
        
        <footer>
          <button 
            disabled={isCommentTextEmpty}
            type="submit"
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment} 
              onDeleteComment={deleteComment}
              content={comment} 
            />
          )
        })}
      </div>
    </article>
  );
}