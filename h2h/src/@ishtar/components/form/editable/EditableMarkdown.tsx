import { memo, useState } from "react";
import { getHotkeyHandler, useClickOutside } from "@mantine/hooks";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  Box,
  createStyles,
  DefaultProps,
  Paper,
  Selectors,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { EditorView } from "@codemirror/view";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkToc from "remark-toc";
import { getColorVariant } from "app/configs/theme.config";
import { useUpdateEffect } from "@ishtar/hooks";

type EditableMarkdownProps = Omit<ReactCodeMirrorProps, "onChange" | "placeholder"> & {
  markdownProps?: Omit<ReactMarkdownOptions, "children">;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  placeholder?: string;
} & Pick<DefaultProps<Selectors<typeof useStyles>>, "className" | "classNames">;

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: 104,
    borderRadius: theme.radius.sm,
    border: `2px solid ${theme.other.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.other.palette.background.default,
    transition: `all ${theme.other.transitions.duration.shorter} ${theme.other.transitions.easing.easeInOut}`,
    "&:hover": {
      borderColor: getColorVariant(theme, "primary"),
    },
    "&.editing": {
      borderColor: getColorVariant(theme, "primary"),
      backgroundColor: "transparent",
    },
    "&.hasValue": {
      backgroundColor: "transparent",
    },

    "& .cm-focused": {
      outline: "none!important",
    },
  },
  editor: { flex: "1 1 0%", height: "100%" },
  markdownWrapper: {
    flex: "1 1 0%",
    width: "100%",
    height: "100%",
    padding: ".4rem .2rem .4rem .4rem",
    cursor: "text",
  },
  markdown: { width: "100%", height: "100%" },
  placeholder: {
    color: theme.other.palette.text.disabled,
    fontFamily: "monospace",
    fontSize: "1.6rem",
    lineHeight: "2.24rem",
    userSelect: "none",
    verticalAlign: "top",
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
  },
}));

const EditableMarkdown = ({
  value: initialValue,
  onChange,
  markdownProps,
  disabled,
  placeholder,
  className,
  classNames,
  style,
  ...props
}: EditableMarkdownProps): JSX.Element => {
  const { classes, cx } = useStyles(undefined, { name: "editable-markdown", classNames });

  const [value, setValue] = useState<string>(initialValue || "");
  const [editing, setEditing] = useState(false);
  useUpdateEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);
  const handleChange = () => {
    if (!editing) return;

    setEditing(false);
    const result = value.replace(/\n*$/, "");
    if (result !== initialValue) {
      setValue(result);
      onChange?.(result);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    value !== initialValue && setValue(initialValue || "");
  };

  const handleKey: React.KeyboardEventHandler<HTMLInputElement> = getHotkeyHandler([
    ["Escape", handleCancel],
    ["mod+Enter", handleChange],
  ]);

  const { colorScheme } = useMantineTheme();
  const ref = useClickOutside(handleChange);
  console.log(`value: ${value}`);
  return (
    <Paper
      ref={ref}
      className={cx(classes.root, className, { editing, hasValue: !!value })}
      style={style}
    >
      {editing ? (
        <CodeMirror
          {...props}
          onKeyDown={handleKey}
          value={value}
          onChange={setValue}
          autoFocus
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
            EditorView.lineWrapping,
          ]}
          theme={colorScheme}
          lang="markdown"
          placeholder={placeholder}
          basicSetup={{ lineNumbers: false, foldGutter: false, searchKeymap: false }}
          className={classes.editor}
        />
      ) : (
        <Box onClick={() => !disabled && setEditing(true)} className={classes.markdownWrapper}>
          {!value ? (
            <Text className={classes.placeholder}>{placeholder}</Text>
          ) : (
            <ReactMarkdown
              {...markdownProps}
              remarkPlugins={[remarkGfm, remarkToc]}
              rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeRaw]}
              linkTarget="_blank"
              className={classes.markdown}
            >
              {value}
            </ReactMarkdown>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default memo(EditableMarkdown);
