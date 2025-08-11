# Changelog

## \[0.1.0-rc.0]

### New Features

- [`421dc74`](https://github.com/DevCloudFE/matechat-react/commit/421dc74f39f24c00801d336dce5fbbdf6830d7f5) Optimize markdown component in `Bubble`, customize link, heading and code. Support copy button for code blocks.
- [`3869f95`](https://github.com/DevCloudFE/matechat-react/commit/3869f9554a87df0925f61350753ead20876f93ec) Optimize behavior of `useChat`:

  - Add `throwOnEmptyBackend` option to `useChat` function.
  - Throw an error when `backend` is nullish and `throwOnEmptyBackend` is `true`.
  - Rename `isPending`to`pending` in `useChat` return value.
  - Allow empty `backend` in `useChat` function.

### Refactors

- [`162bad9`](https://github.com/DevCloudFE/matechat-react/commit/162bad95fc1277a259b7490a5d59e1baa93891fe) Extract all markdown components and resolve code lints.

## \[0.1.0-beta.3]

### Performance Improvements

- [`b07439f`](https://github.com/DevCloudFE/matechat-react/commit/b07439f90089648ddd2f94d92a72dd818074af02) Default wrap `BubbleList` with `React.memo` to avoid extra rerender.

## \[0.1.0-beta.2]

### Bug Fixes

- [`a11cb5d`](https://github.com/DevCloudFE/matechat-react/commit/a11cb5d57b0cf83ed7cdd07e60c276d75843df95) Enforce some styles for `Sender` component.

## \[0.1.0-beta.1]

### Performance Improvements

- [`57077a8`](https://github.com/DevCloudFE/matechat-react/commit/57077a8439a97bed327668bc6f2be3bb630c2749) Optimize performance of `BubbleList` component, avoid extra rerender overheads.

## \[0.1.0-beta.0]

### Refactors

- [`5019927`](https://github.com/DevCloudFE/matechat-react/commit/501992755827669d76b63a8e88837f71db186e4a) Rewrite auto scroll logic of `BubbleList` component:

  - Use `ResizeObserver` to detect content size changes and scroll accordingly.
  - Add `scrollContainer` method to scroll to bottom when content size changes.
  - Introduce `pauseScroll` to prevent unnecessary scrolls during updates.

## \[0.1.0-alpha.8]

### New Features

- [`6a494c2`](https://github.com/DevCloudFE/matechat-react/commit/6a494c2e4e4c117c404e42e362e4b9a3535aa62e) ([#47](https://github.com/DevCloudFE/matechat-react/pull/47) by [@xx-yoke](https://github.com/DevCloudFE/matechat-react/../../xx-yoke)) Add `InputCount` component.

  - Remove the input count div container and wrap it into a new component, allowing users to customize the input limit.
  - Remove the justify-center style from the div container and add ml-auto to the SenderButton to ensure button remains on the right side.

## \[0.1.0-alpha.7]

### Performance Improvements

- [`36ca7eb`](https://github.com/DevCloudFE/matechat-react/commit/36ca7eb9900a9e484a1b083f881e6d49e431e24a) Wrap all `useChat` hooks with `useCallback` to avoid re-rendering.

## \[0.1.0-alpha.6]

### Bug Fixes

- [`8044b1e`](https://github.com/DevCloudFE/matechat-react/commit/8044b1eed9defb6f195cf715bd8c2321ad41be1d) ([#30](https://github.com/DevCloudFE/matechat-react/pull/30) by [@Raven-Book](https://github.com/DevCloudFE/matechat-react/../../Raven-Book)) adjust title/description font-size to match the prompt component

## \[0.1.0-alpha.5]

### New Features

- [`31f4edf`](https://github.com/DevCloudFE/matechat-react/commit/31f4edf5b24d7488ad3049e40eeca081593f9939) ([#31](https://github.com/DevCloudFE/matechat-react/pull/31)) Add `FileUpload` component for file selections.
- [`4e2905b`](https://github.com/DevCloudFE/matechat-react/commit/4e2905b6e8a06e0496205f347c11732f6c18af7e) Optimize callback performance by using `useCallback`.
- [`cd8ace0`](https://github.com/DevCloudFE/matechat-react/commit/cd8ace015d070290798369768125581429c0bf49) Remove gap and margin between textarea and footer in `Sender` component.

## \[0.1.0-alpha.4]

### New Features

- [`a0b5fc8`](https://github.com/DevCloudFE/matechat-react/commit/a0b5fc8d720460ca7c6df562fbcbe3ada26805b3) ([#26](https://github.com/DevCloudFE/matechat-react/pull/26)) Add `List` component in `list.tsx` to support grouped or normal lists.

### Bug Fixes

- [`d61b43c`](https://github.com/DevCloudFE/matechat-react/commit/d61b43c178c4f6340b944b12017ff8b57ba2476d) Fix the build issue in `utils` by adding `utils/index.ts` to vite build entries.

## \[0.1.0-alpha.3]

- [`3a19451`](https://github.com/DevCloudFE/matechat-react/commit/3a19451365a39174e32a18a25685286914c48e9f) Fix the lint error on `useEffect` in `sender.tsx`.
- [`b5e4cb8`](https://github.com/DevCloudFE/matechat-react/commit/b5e4cb86ffb618ff147ca8b1133db6eb4748f5a2) Optimize the `SenderButton` component in `sender.tsx`.

  This optimization includes:

  - Add `icon` and `isSending` option to `SenderButton` component.
  - Add doc-string for `SenderButton` and `Sender` props.

## \[0.1.0-alpha.2]

- [`17b60e7`](https://github.com/DevCloudFE/matechat-react/commit/17b60e7a0db056e37fe2e34dabbda4a2c15af972) ([#23](https://github.com/DevCloudFE/matechat-react/pull/23) by [@Raven-Book](https://github.com/DevCloudFE/matechat-react/../../Raven-Book)) Add loading animation during AI request wait states.

  - Updated `BubbleListProps` and `Bubble` in `bubble.tsx` to support pending states
  - Modified `useChat` in `chat.ts` to set `pending = true` before API requests

## \[0.1.0-alpha.1]

- [`577946c`](https://github.com/DevCloudFE/matechat-react/commit/577946c3300207688c7b9927739b49536e1438a5) Optimize `background` option of `BubbleList` component.

  BREAKING CHANGES:

  - Use `left-solid`, `right-solid`, `transparent` and `solid` as the value of `background` option.
  - Default to use `right-solid` as the value of `background` option in `Bubble` component.
  - Remove `left-only` and `right-only` value in `Bubble` component.

- [`577946c`](https://github.com/DevCloudFE/matechat-react/commit/577946c3300207688c7b9927739b49536e1438a5) Bump dependencies.

## \[0.1.0-alpha.0]

- [`464fc05`](https://github.com/DevCloudFE/matechat-react/commit/464fc054724779bebe8afefa5aa37f22253bfe03) Release first pre-release with alpha tag of `@matechat/react`.
