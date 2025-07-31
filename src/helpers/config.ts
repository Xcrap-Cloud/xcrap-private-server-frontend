const configHelper = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003",
    clients: {
        defaultId: "3a58a5e2-9b08-4860-b8bd-501898d57317",
        perPageInSelector: 4,
    },
    users: {
        minNameLength: 3,
        maxNameLength: 100,
        minUsernameLength: 4,
        maxUsernameLength: 16,
        maxEmailLength: 150,
        generatedUsernameLength: 8,
    },
}

export default configHelper
