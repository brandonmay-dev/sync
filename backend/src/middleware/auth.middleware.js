import { clerkClient, getAuth } from "@clerk/express";

const normalizeEmail = (email) => email?.trim().toLowerCase() || null;

const getAllowedAdminEmails = () => {
  const configuredEmails = [
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_EMAILS,
  ].filter(Boolean);

  return new Set(
    configuredEmails
      .flatMap((value) => value.split(","))
      .map((email) => normalizeEmail(email))
      .filter(Boolean),
  );
};

export const protectRoute = async (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUser = await clerkClient.users.getUser(userId);
    const allowedAdminEmails = getAllowedAdminEmails();
    const userEmails = new Set(
      [
        currentUser.primaryEmailAddress?.emailAddress,
        ...(currentUser.emailAddresses || []).map(
          (emailAddress) => emailAddress.emailAddress,
        ),
      ]
        .map((email) => normalizeEmail(email))
        .filter(Boolean),
    );

    const isAdmin = [...userEmails].some((email) =>
      allowedAdminEmails.has(email),
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
