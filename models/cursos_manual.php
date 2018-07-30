<?php 
	require_once("conexion.php");

	Class Cursos_Manual extends Conexion{

		public function cboCursos(){
	        
	        $this->conectar(2);
	        $this->memoria = $this->con2->query("SELECT DISTINCT curricular.codCurso,cursos.nomCurso FROM curricular LEFT JOIN cursos on curricular.codCurso=cursos.codCurso ORDER BY curricular.codCurso");
	        $datos= $this->memoria->fetchAll(PDO::FETCH_OBJ);
	        $this->Close(2);
	        return $datos;
	    }

	    public function cboPeriodos(){

	        $sql = "SELECT * FROM curricula ORDER BY perAcademico DESC";
	        $this->Conectar(1);
	        $this->memoria = $this->con1->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);

	            return $datos;

	        } else {
	            
	            return "vacio";
	            
	        }
	    }

	    public function HorarioCurso($codCurso,$periodo)
	    {
	        try {
	            $this->Conectar(1);
	            $this->memoria = $this->con1->query("SELECT horariosfim.basehorarios.*,oeraae2018.docentes.apePaterno,oeraae2018.docentes.apeMaterno,oeraae2018.docentes.nombres,oeraae2018.cursos.nomCurso from horariosfim.basehorarios INNER JOIN oeraae2018.docentes ON horariosfim.basehorarios.codDocente=oeraae2018.docentes.codDocente INNER JOIN oeraae2018.cursos ON horariosfim.basehorarios.codCurso=oeraae2018.cursos.codCurso WHERE horariosfim.basehorarios.codCurso='$codCurso' AND horariosfim.basehorarios.perAcademico='$periodo' AND horariosfim.basehorarios.estado=1");
	            
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(1);
	            return $datos;
	        }
	        catch (Exception $a) {
	            echo "error" . $a->getMessage();
	        }
	    }

	    public function mostrarCursosPorPeriodo($vercurricular){

	        $sql="SELECT DISTINCT codCurso FROM curricular WHERE verCurricular='$vercurricular'";
	         $this->Conectar(2);
	        $this->memoria = $this->con2->query($sql);
	        if (!empty($this->memoria)) {
	            $datos = $this->memoria->fetchAll(PDO::FETCH_OBJ);
	            $this->Close(2);

	            return $datos;

	        } else {
	            
	            return "vacio";
	            
	        }
	    }
	}
?>