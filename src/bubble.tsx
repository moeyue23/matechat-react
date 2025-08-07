import { cva, type VariantProps } from "class-variance-authority";
import "./tailwind.css";

import clsx from "clsx";
import type React from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { twMerge } from "tailwind-merge";
import type { MessageParam } from "./utils";

const useTheme = () => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setDark(event.matches);
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return { isDark };
};

const bubbleVariants = cva(
  "flex flex-col gap-1 justify-center rounded-lg dark:text-gray-200 text-gray-800 max-w-full overflow-x-auto",
  {
    variants: {
      size: {
        default: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
        md: "px-4 py-2 text-base",
        sm: "px-3 py-1 text-sm",
        xs: "px-2 py-1 text-xs",
      },
      align: {
        left: "self-start",
        center: "self-center",
        right: "self-end",
      },
      background: {
        transparent: "bg-transparent",
        solid: "bg-gray-100 dark:bg-gray-800",
      },
    },
    defaultVariants: {
      size: "default",
      align: "left",
    },
  },
);

/**
 * Props for the Bubble component.
 */
export interface BubbleProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bubbleVariants> {
  /**
   * The text to display in the bubble.
   * @description The content of the bubble, which can include Markdown syntax.
   */
  text: string;
  /**
   * Whether to display the background of the bubble.
   * @default "solid"
   */
  background?: "transparent" | "solid";
  /**
   * Custom pending content to display when pending is true.
   * @description If not provided, will use default dots animation.
   */
  pending?: React.ReactNode;
  /**
   * Whether the bubble is in pending state.
   * @default false
   */
  isPending?: boolean;
}

export function Bubble({
  className,
  text,
  size,
  align,
  background = "solid",
  pending,
  isPending = false,
  ...props
}: BubbleProps) {
  const { isDark } = useTheme();

  const defaultPending = (
    <div className="flex items-center space-x-1 py-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
    </div>
  );

  return (
    <div
      data-slot="bubble"
      className={twMerge(
        clsx(
          bubbleVariants({
            className,
            size,
            align,
            background,
          }),
          pending && "flex items-center",
        ),
      )}
      {...props}
    >
      {isPending ? (
        pending || defaultPending
      ) : (
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            h1(props) {
              const { children, className, node: _node, ...rest } = props;
              return (
                <h1
                  {...rest}
                  className={clsx("my-3 text-2xl font-bold", className)}
                >
                  {children}
                </h1>
              );
            },
            h2(props) {
              const { children, className, node: _node, ...rest } = props;
              return (
                <h2
                  {...rest}
                  className={clsx("my-2 text-xl font-bold", className)}
                >
                  {children}
                </h2>
              );
            },
            h3(props) {
              const { children, className, node: _node, ...rest } = props;
              return (
                <h3
                  {...rest}
                  className={clsx("my-1 text-lg font-bold", className)}
                >
                  {children}
                </h3>
              );
            },
            code(props) {
              const { children, className, ref: _ref, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");

              const [copied, setCopied] = useState(false);
              const handleCopy = () => {
                navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              };

              return match ? (
                <div
                  className={clsx(
                    "w-full overflow-x-auto rounded-lg",
                    "bg-gray-50 dark:bg-gray-800",
                  )}
                >
                  <div className="inline-flex w-full justify-between bg-gray-100 p-2">
                    <div className="px-2 py-1 text-xs text-gray-900 dark:text-gray-400">
                      {match[1]}
                    </div>
                    <div
                      className="px-2 py-1 text-xs text-gray-900 dark:text-gray-400 cursor-pointer"
                      onClick={handleCopy}
                    >
                      {copied ? "Copied" : "Copy"}
                    </div>
                  </div>
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={isDark ? vscDarkPlus : oneLight}
                    customStyle={{
                      background: "transparent",
                      margin: 0,
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      overflowX: "auto",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                      },
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  {...rest}
                  className={clsx(
                    "rounded-md px-1 py-0.5 text-[85%]",
                    "bg-gray-100 dark:bg-gray-800",
                  )}
                >
                  {children}
                </code>
              );
            },
            blockquote(props) {
              const { children, className, ...rest } = props;
              return (
                <blockquote
                  {...rest}
                  className={clsx(
                    "border-l-4 border-gray-300 pl-4 italic",
                    className,
                  )}
                >
                  {children}
                </blockquote>
              );
            },
            a(props) {
              const { children, className, ref: _ref, ...rest } = props;
              return (
                <a
                  {...rest}
                  className={clsx(
                    "text-blue-600 dark:text-blue-400 hover:underline underline-offset-1",
                    className,
                  )}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {text}
        </Markdown>
      )}
    </div>
  );
}

export interface AvatarProps extends React.ComponentProps<"div"> {
  text?: string;
  imageUrl?: string;
}

export function Avatar({ className, text, imageUrl, ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      className={twMerge(
        clsx(
          "flex items-center justify-center w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-800 dark:text-gray-200 text-gray-800",
          className,
        ),
      )}
      {...props}
    >
      {imageUrl ? (
        <img
          className="w-full h-full object-cover rounded-full"
          src={imageUrl}
          alt={text}
        />
      ) : (
        text
      )}
    </div>
  );
}

export interface BubbleListProps extends React.ComponentProps<"div"> {
  messages: MessageParam[];
  /**
   * How to display the background of the bubbles.
   * @default "right-solid"
   */
  background?: "transparent" | "solid" | "left-solid" | "right-solid";
  isPending?: boolean;
  assistant?: {
    avatar?: AvatarProps;
    align?: "left" | "right";
  };
  footer?: React.ReactNode;
  pending?: React.ReactNode;
  /**
   * The height threshold for triggering scroll behavior.
   * @default 8
   */
  threshold?: number;
}

export const BubbleList = memo(function BubbleList({
  className,
  background = "right-solid",
  footer,
  pending,
  assistant,
  isPending = true,
  messages,
  threshold = 8,
  ...props
}: BubbleListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const pauseScroll = useRef<boolean>(false);
  const contentRect = useRef<DOMRect>(new DOMRect());

  const scrollContainer = useCallback((smooth?: boolean) => {
    if (pauseScroll.current) return;

    requestAnimationFrame(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollHeight,
        behavior: smooth ? "smooth" : "instant",
      });
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height, width } = entry.contentRect;
        if (
          Math.abs(contentRect.current.height - height) > threshold ||
          Math.abs(contentRect.current.width - width) > threshold
        ) {
          contentRect.current = entry.contentRect;
          scrollContainer();
        }
      }
    });

    observer.observe(containerRef.current);
    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [scrollContainer, threshold]);

  const isScrollAtBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return true;

    return (
      Math.abs(
        container.scrollTop + container.clientHeight - container.scrollHeight,
      ) < threshold
    );
  }, [threshold]);

  const handleWheel = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isScrollAtBottom()) {
      pauseScroll.current = false;
    } else {
      pauseScroll.current = true;
    }
  }, [isScrollAtBottom]);

  const handleTouchStart = useCallback(() => {
    pauseScroll.current = true;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isScrollAtBottom()) {
      pauseScroll.current = false;
      scrollContainer(false);
    } else {
      pauseScroll.current = true;
    }
  }, [isScrollAtBottom, scrollContainer]);

  const handleTouchMove = useCallback(() => {
    pauseScroll.current = true;
  }, []);

  return (
    <div
      data-slot="bubble-list"
      className={twMerge(
        clsx("flex flex-col overflow-y-auto flex-1 gap-4", className),
      )}
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      {...props}
    >
      <div
        data-slot="bubble-items"
        className="flex flex-col max-w-full flex-1 gap-4"
        ref={contentRef}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            data-slot="bubble-item"
            className={twMerge(
              clsx(
                "flex items-start gap-2",
                message.align === "right" && "flex-row-reverse",
              ),
            )}
          >
            {message.avatar && (
              <Avatar
                className="flex-shrink-0"
                {...(typeof message.avatar === "string"
                  ? { imageUrl: message.avatar }
                  : message.avatar)}
              />
            )}
            <Bubble
              text={message.content}
              align={message.align}
              background={
                (background === "left-solid" && message.align === "left") ||
                (background === "right-solid" && message.align === "right") ||
                background === "solid"
                  ? "solid"
                  : "transparent"
              }
            />
          </div>
        ))}
        {isPending && (
          <div
            key="pending"
            data-slot="bubble-item"
            className={twMerge(
              clsx(assistant?.align === "right" && "flex-row-reverse"),
              "flex items-start gap-2 w-full",
            )}
          >
            <Avatar className="flex-shrink-0" {...(assistant?.avatar || {})} />
            <Bubble
              isPending={isPending}
              pending={pending}
              text=""
              align={assistant?.align || "left"}
              background={
                (background === "left-solid" &&
                  (assistant?.align || "left") === "left") ||
                (background === "right-solid" &&
                  (assistant?.align || "left") === "right") ||
                background === "solid"
                  ? "solid"
                  : "transparent"
              }
            />
          </div>
        )}
      </div>
      {footer && (
        <div
          data-slot="bubble-footer"
          className="flex items-center justify-center mt-4"
        >
          {footer}
        </div>
      )}
    </div>
  );
});
