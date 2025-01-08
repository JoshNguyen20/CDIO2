import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import MealPlanPage from "../pages/MealPlansPage/MealPlan.jsx";
import ForgotPassword from "../pages/AuthPage/ForgotPasswordPage.jsx";
import VerifyOtpPage from "../pages/AuthPage/VerifyOtpPage.jsx";
import UpdatePasswordPage from "../pages/AuthPage/UpdatePasswordPage.jsx";
import CreatePage from "../pages/CreatePage/CreatePage.jsx";
import LoadingPage from "../pages/CreatePage/LoadingPage.jsx";
import WorkoutPlans from "../pages/WorkoutPlansPage/WorkoutPlan.jsx";
import UserProfilePage from "../pages/User/UserProfilePage.jsx"
import AdminDashPage from "../pages/DashBoard_Admin/AdminDashPage.jsx";
import ProgressTracking from "../pages/ProgressTrackingPage/ProgressTracking.jsx";
import Blog from "../pages/Blog/Blog.jsx";
import ToolForUser from "../pages/ToolForUser/ToolForUser.jsx";
import GeneratorPlansPage from "../pages/GeneratorPlans/GeneratorPlans.jsx";
import OurTeam from "../pages/AboutPage/OutTeam.jsx";

export const routes = [
    {   
        id: 1,
        path: '/',
        page: HomePage,
    },
    {   
        id: 2,
        path: '/login',
        page: LoginPage,
    },
    {   
        id: 3,
        path: '/forgot-password',
        page: ForgotPassword,
    },
    {   
        id: 4,
        path: '/forgot-password/verify-otp',
        page: VerifyOtpPage,
    },
    {   
        id: 5,
        path: '/forgot-password/verify-otp/update-password',
        page: UpdatePasswordPage,
    },
    {   
        id: 6,
        path: '/generator',
        page: GeneratorPlansPage,
    },
    {   
        id: 7,
        path: '/loading',
        page: LoadingPage,
    },
    // {   
    //     id: 8,
    //     path: '/complete',
    //     page: CompletePage,
    // },
    {   
        id: 9,
        path: '/home',
        page: HomePage,
    },
    {   
        id: 10,
        path: '/about',
        page: AboutPage,
    },
    {   
        // id: 11,
        // path: '/plans',
        id: 10,
        path: '/meal-plans',
        page: MealPlanPage,
    },
    {   
        id: 11,
        path: '/workout-plans',
        page: WorkoutPlans,
    },
    {   
        id: 12,
        path: '/profile',
        page: UserProfilePage,
    },
    {   
        id: 13,
        path: '/tracking',
        page: ProgressTracking,
    },
    {   
        id: 14,
        path: '/admin-dashboard',
        page: AdminDashPage,
    },
    {   
        id: 15,
        path: '/blogs',
        page: Blog,
    },
    {   
        id: 16,
        path: '/tools',
        page: ToolForUser,
    },
    {   
        id: 17,
        path: '/our-team',
        page: OurTeam,
    },

    {   
        id: 18,
        path: '*',
        page: ErrorPage,
    },



];
