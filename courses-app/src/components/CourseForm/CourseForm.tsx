import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';

import { BUTTONS_TEXT, INPUTS_TEXT } from '../../constants';
import { formatDate } from '../../helpers/dateGenerator';
import { formatDuration } from '../../helpers/pipeDuration';
import { AuthorRequestType, AuthorType, CourseType } from '../../types';

import {
	StyledAuthorBlock,
	StyledAuthorChange,
	StyledAuthorWrapper,
	StyledDataInnerWrapper,
	StyledTitleWrapper,
	StyledInnerWrapper,
	StyledFormWrapper,
} from './CourseForm.style';

import {
	addAuthorRequest,
	getAuthorsRequest,
} from '../../store/authors/authorsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
	addCourseRequest,
	updateCourseRequest,
} from '../../store/courses/coursesSlice';
import useAuthorsHook from '../../hooks/useAuthorsHook';
import Loader from '../../common/Loader/Loader';
import { selectToken } from '../../store/selectors';
import useCoursesHook from '../../hooks/useCoursesHook';

const initialFormState: CourseType = {
	id: '',
	title: '',
	description: '',
	duration: 0,
	creationDate: '',
	authors: [],
};

const CourseForm: React.FC = () => {
	const { courseId } = useParams<{ courseId: string }>();
	const token = useAppSelector(selectToken);
	const { courses } = useCoursesHook();
	const {
		authors: allAuthors,
		status: authorsLoading,
		error: authorsError,
	} = useAuthorsHook();
	const [authors, setAuthors] = useState<AuthorType[]>(allAuthors);
	const [newCourse, setNewCourse] = useState<CourseType>(initialFormState);
	const [courseAuthors, setCourseAuthors] = useState<AuthorType[]>([]);
	const [newAuthor, setNewAuthor] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const updatedCourse = courses.find((course) => course.id === courseId);

	useEffect(() => {
		if (updatedCourse) {
			setNewCourse(updatedCourse);
			const filteredCourseAuthors = allAuthors.filter((author) =>
				updatedCourse.authors.includes(author.id)
			);
			const filteredAllAuthors = allAuthors.filter(
				(author) => !updatedCourse.authors.includes(author.id)
			);
			setCourseAuthors(filteredCourseAuthors);
			setAuthors(filteredAllAuthors);
		}
	}, [allAuthors, updatedCourse]);

	const handlerTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCourse({ ...newCourse, title: e.target.value });
	};
	const handlerDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewCourse({ ...newCourse, description: e.target.value });
	};
	const handlerDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const duration = parseInt(e.target.value);
		if (!isNaN(duration)) {
			setNewCourse({ ...newCourse, duration: duration });
		}
	};

	const isFormValid = () =>
		newCourse.title.trim().length > 0 &&
		newCourse.description.trim().length > 0 &&
		newCourse.duration > 0 &&
		courseAuthors.length > 0;

	const addProperties = () => {
		const authorIDs = courseAuthors.map((author) => author.id);
		const updatedCourse = {
			...newCourse,
			creationDate: formatDate(new Date()),
			authors: authorIDs,
		};
		return updatedCourse;
	};

	const updateCourseHandler = async (
		newCourse: CourseType,
		id: string,
		token: string
	) => {
		const result = await dispatch(
			updateCourseRequest({ course: newCourse, id, token })
		);
		if (updateCourseRequest.fulfilled.match(result)) {
			navigate('/courses');
			setNewCourse(initialFormState);
		}
	};

	const creationCoursesHandler = async (
		newCourse: CourseType,
		token: string
	) => {
		const result = await dispatch(
			addCourseRequest({ course: newCourse, token })
		);
		if (addCourseRequest.fulfilled.match(result)) {
			navigate('/courses');
			setNewCourse(initialFormState);
		}
	};

	const formSubmitHandler = () => {
		if (!isFormValid()) {
			alert('Please, fill in all fields');
			return;
		}

		const addNewCourse = addProperties();
		if (courseId && token) {
			updateCourseHandler(addNewCourse, courseId, token);
			return;
		}
		if (token && !courseId) {
			creationCoursesHandler(addNewCourse, token);
			return;
		}
	};

	const handlerAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewAuthor(e.target.value);
	};
	const authorCreationHandler = async () => {
		if (newAuthor.length < 2) {
			alert('Too short name');
			return;
		}
		if (authors.some((author) => author.name === newAuthor)) {
			alert('This author is already been');
			return;
		}
		const authorData: AuthorRequestType = {
			name: newAuthor,
		};
		if (token) {
			const result = await dispatch(addAuthorRequest({ authorData, token }));
			if (addAuthorRequest.fulfilled.match(result)) {
				dispatch(getAuthorsRequest());
				setNewAuthor('');
			}
		}
	};
	const authorInsertHandler = (author: AuthorType) => {
		setCourseAuthors([...courseAuthors, author]);
		setAuthors(authors.filter((a) => a.id !== author.id));
	};
	const authorDeleteHandler = (author: AuthorType) => {
		setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
		setAuthors([...authors, author]);
	};

	return (
		<div>
			<StyledFormWrapper>
				<StyledTitleWrapper>
					<StyledInnerWrapper>
						<Input
							label={INPUTS_TEXT.TITLE}
							htmlFor={INPUTS_TEXT.TITLE}
							placeholder={INPUTS_TEXT.TITLE_PLH}
							value={newCourse.title}
							onChange={handlerTitleChange}
						/>
					</StyledInnerWrapper>
					<Button
						text={
							courseId ? BUTTONS_TEXT.UPDATE_COURSE : BUTTONS_TEXT.CREATE_COURSE
						}
						onClick={formSubmitHandler}
					/>
				</StyledTitleWrapper>
				<label htmlFor='descrInput'>{INPUTS_TEXT.DESCR_PLH}</label>
				<textarea
					name='Description'
					id='descrInput'
					cols={30}
					rows={10}
					placeholder={INPUTS_TEXT.DESCR_PLH}
					value={newCourse.description}
					onChange={handlerDescriptionChange}
				></textarea>
				<StyledAuthorWrapper>
					<StyledAuthorBlock>
						<StyledDataInnerWrapper>
							<h3>Add author</h3>
							<Input
								label={INPUTS_TEXT.AUTHOR}
								htmlFor={INPUTS_TEXT.AUTHOR_FOR}
								placeholder={INPUTS_TEXT.AUTHOR_PLH}
								value={newAuthor}
								onChange={handlerAuthorChange}
							/>
							<Button
								text={BUTTONS_TEXT.CREATE_AUTHOR}
								onClick={authorCreationHandler}
							/>
						</StyledDataInnerWrapper>
						<StyledDataInnerWrapper>
							<h3>Duration</h3>
							<Input
								label={INPUTS_TEXT.DURATION}
								htmlFor={INPUTS_TEXT.DURATION}
								placeholder={INPUTS_TEXT.DURATION_PLH}
								value={newCourse.duration}
								onChange={handlerDurationChange}
							/>
							<h2>
								Duration:{' '}
								<span>
									{newCourse.duration
										? formatDuration(newCourse.duration)
										: '00:00'}
								</span>{' '}
							</h2>
						</StyledDataInnerWrapper>
					</StyledAuthorBlock>
					<StyledAuthorBlock>
						<h3>Authors</h3>
						<StyledDataInnerWrapper data-testid='all-authors'>
							{authorsError && (
								<p>Ooops!! Some error occurred! {authorsError}</p>
							)}
							{authorsLoading && <Loader />}
							{!authorsLoading &&
								!authorsError &&
								authors.map((author) => (
									<StyledAuthorChange
										data-testid='all-authors-author'
										key={author.id}
									>
										<p>{author.name}</p>
										<Button
											text={BUTTONS_TEXT.ADD_AUTHOR}
											onClick={() => authorInsertHandler(author)}
										/>
									</StyledAuthorChange>
								))}
						</StyledDataInnerWrapper>
						<h3>Course authors</h3>
						<StyledDataInnerWrapper data-testid='course-authors'>
							{courseAuthors.length ? (
								courseAuthors.map((author) => (
									<StyledAuthorChange
										data-testid='course-authors-author'
										key={author.id}
									>
										<p>{author.name}</p>
										<Button
											text={BUTTONS_TEXT.DEL_AUTHOR}
											onClick={() => authorDeleteHandler(author)}
										/>
									</StyledAuthorChange>
								))
							) : (
								<p>Author list is empty</p>
							)}
						</StyledDataInnerWrapper>
					</StyledAuthorBlock>
				</StyledAuthorWrapper>
			</StyledFormWrapper>
		</div>
	);
};

export default CourseForm;
