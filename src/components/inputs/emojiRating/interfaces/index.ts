export interface EmojiRatingProps {
  /** 0-1 continuous value (default 0.5) */
  value?: number;
  onChange?: (value: number) => void;
  width?: number;
  /** Emoji size in px (default 48) */
  emojiSize?: number;
}
