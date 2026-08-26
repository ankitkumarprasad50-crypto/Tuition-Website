using Google.Apis.Auth;

namespace TuitionServer.Auth;

public static class GoogleAuth
{
    // Verifies a Google ID token (from "Sign in with Google") against our client
    // id and returns the verified, lowercased email — or null if invalid.
    public static async Task<string?> VerifyEmailAsync(string? credential, string? clientId)
    {
        if (string.IsNullOrWhiteSpace(credential) || string.IsNullOrWhiteSpace(clientId))
            return null;
        try
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(credential,
                new GoogleJsonWebSignature.ValidationSettings { Audience = new[] { clientId } });
            if (payload.EmailVerified && !string.IsNullOrWhiteSpace(payload.Email))
                return payload.Email.Trim().ToLowerInvariant();
        }
        catch
        {
            // invalid / expired / wrong audience
        }
        return null;
    }
}
