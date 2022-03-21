module.exports = {
    // match this pattern : feat/new-feature
    pattern: /^(feat|fix|style|refactor|test|build|revert|release)(\/[a-zA-Z0-9-_]+)+$/,
    errorMsg:
        '🤨 La branche que tu essaies de pusher ne respecte pas nos conventions, tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`',
    }