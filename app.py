from flask import Flask, render_template, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask(__name__, static_url_path='/static', static_folder="build/static", template_folder="build")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
CORS(app)

db = SQLAlchemy(app)

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    rating = db.Column(db.Integer)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_movie', methods=['POST'])
def add_movie():
    movie_data = request.get_json()
    new_movie = Movie(title=movie_data['title'], rating=movie_data['rating'])
    db.session.add(new_movie)
    db.session.commit()
    return 'Done', 201

@app.route('/movies')
def movies():
    movie_list = Movie.query.all()
    movies = []
    for movie in movie_list:
        movies.append({'title': movie.title, 'rating': movie.rating})
    return jsonify({'movies': movies})

if __name__ == '__main__':
    app.run(debug=True)