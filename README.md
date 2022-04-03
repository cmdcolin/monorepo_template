# monorepo_template

This is a work in progress on creating a monorepo template

My goal is:

Have various packages e.g.

- `workspace-a` - contains react components, depends on `workspace-b`
- `workspace-b` - contains react components, no dependencies
- `app` - a `create-react-app` instance, renders a react component from `workspace-a`

How can I make it so that when I have `yarn start` in the app directory, then changes to workspace-a or workspace-b will be auto-updated on the webpage?

Options:

1. Run `yarn workspaces run build` to build entire repo. This is expensive
   though
2. Run `yarn build` only in the workspace that I change, but this is laborious
   if I am working on many packages
3. Something else?

I am trying to think of ways to use project references from `typescript`, or
dependency graph concepts from `lerna` to help, but not sure I have the right
workflow yet

Similar issue: want to make it so that I can run `yarn test --watch` on entire
repo, see if any issues come up? Not sure if this is asking too much. It seems
like this has similar issues to the `yarn start` on the app where all the
sub-dependencies need to be built to test it properly
