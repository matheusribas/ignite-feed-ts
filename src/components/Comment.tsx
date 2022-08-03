import { useState } from 'react';

import { ThumbsUp, Trash } from 'phosphor-react';

import { Avatar } from './Avatar';

import styles from './Comment.module.css';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const[likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeCount() {
    setLikeCount(likeCount + 1)
  }

  return (
    <div className={styles.comment}>
      <Avatar 
        hasBorder={false}
        src="https://github.com/matheusribas.png"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <div>
            <header>
              <div className={styles.authorAndTime}>
                <strong>Matheus Felipe</strong>
                <time title='02 de Agosto às 16:07h' dateTime='2022-08-02 16:07:00'>Cerca de 1h atrás</time>
              </div>

              <button onClick={handleDeleteComment} title='Deletar comentário'>
                <Trash size={24} />
              </button>
            </header>

            <p>{content}</p>
          </div>
        </div>

        <footer>
          <button onClick={handleLikeCount} title='Aplaudir'>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}